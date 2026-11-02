import { assign, emit, fromPromise, setup } from 'xstate'
import type { CartItem, CheckoutResult } from '../types'

interface CheckoutContext {
  items: CartItem[]
  errorMessage: string | null
  orderResult: CheckoutResult | null
}

type CheckoutEvent =
  | { type: 'CONTINUE' }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' }
  | { type: 'SYNC_ITEMS'; items: CartItem[] }

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
    output: {} as CheckoutResult,
    emitted: {} as { type: 'orderSuccess'; orderId: string | number },
  },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
  },
  actors: {
    submitOrder: fromPromise(
      async ({ input, signal }: { input: { items: CartItem[] }; signal: AbortSignal }) => {
        const total = input.items.reduce((sum, item) => sum + item.price * item.qty, 0)
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: input.items, total }),
          signal,
        })

        if (!response.ok) {
          throw new Error('Unable to complete checkout. Please try again.')
        }

        return (await response.json()) as CheckoutResult
      },
    ),
  },
}).createMachine({
  id: 'checkout',
  initial: 'review',
  context: {
    items: [],
    errorMessage: null,
    orderResult: null,
  },
  on: {
    SYNC_ITEMS: {
      actions: assign({ items: ({ event }) => event.items }),
    },
  },
  states: {
    review: {
      on: {
        CONTINUE: {
          target: 'payment',
          guard: 'hasItems',
          actions: assign({ errorMessage: null }),
        },
      },
    },
    payment: {
      on: {
        SUBMIT: {
          target: 'submitting',
          guard: 'hasItems',
        },
        CANCEL: 'review',
      },
    },
    submitting: {
      invoke: {
        src: 'submitOrder',
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: 'success',
          actions: assign({ orderResult: ({ event }) => event.output }),
        },
        onError: {
          target: 'review',
          actions: assign({
            errorMessage: ({ event }) =>
              event.error instanceof Error
                ? event.error.message
                : 'Unable to complete checkout. Please try again.',
          }),
        },
      },
      on: {
        CANCEL: {
          target: 'review',
          actions: assign({ errorMessage: null }),
        },
      },
    },
    success: {
      type: 'final',
      output: ({ context }) => context.orderResult!,
      entry: emit(({ context }) => ({
        type: 'orderSuccess',
        orderId: context.orderResult!.id,
      })),
    },
  },
})