'use client'

import * as React from 'react'

import {AlertCircle} from 'lucide-react'

import {cn} from '@/common/utils/cn'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 2000
const TOAST_ANIMATION_DURATION = 300

interface ToasterToast {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
    open?: boolean
}

const _actionTypes = {
    ADD_TOAST: 'ADD_TOAST',
    UPDATE_TOAST: 'UPDATE_TOAST',
    DISMISS_TOAST: 'DISMISS_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
} as const

type ActionType = typeof _actionTypes

let count = 0

function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

type Action =
    | {
          type: ActionType['ADD_TOAST']
          toast: ToasterToast
      }
    | {
          type: ActionType['UPDATE_TOAST']
          toast: Partial<ToasterToast>
      }
    | {
          type: ActionType['DISMISS_TOAST']
          toastId?: ToasterToast['id']
      }
    | {
          type: ActionType['REMOVE_TOAST']
          toastId?: ToasterToast['id']
      }

interface State {
    toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, delay: number = TOAST_REMOVE_DELAY) => {
    if (toastTimeouts.has(toastId)) {
        return
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        dispatch({
            type: 'REMOVE_TOAST',
            toastId,
        })
    }, delay)

    toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            }

        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((t) => (t.id === action.toast.id ? {...t, ...action.toast} : t)),
            }

        case 'DISMISS_TOAST': {
            const {toastId} = action

            if (toastId) {
                // 애니메이션 시간을 고려하여 제거
                addToRemoveQueue(toastId, TOAST_ANIMATION_DURATION)
            } else {
                state.toasts.forEach((item) => {
                    addToRemoveQueue(item.id, TOAST_ANIMATION_DURATION)
                })
            }

            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === toastId || toastId === undefined
                        ? {
                              ...t,
                              open: false,
                          }
                        : t,
                ),
            }
        }
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                }
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            }
    }
}

const listeners: ((state: State) => void)[] = []

let memoryState: State = {toasts: []}

function dispatch(action: Action) {
    memoryState = reducer(memoryState, action)
    listeners.forEach((listener) => {
        listener(memoryState)
    })
}

type Toast = Omit<ToasterToast, 'id'>

function toast({...toastProps}: Toast) {
    const id = genId()

    const update = (toastUpdateProps: ToasterToast) =>
        dispatch({
            type: 'UPDATE_TOAST',
            toast: {...toastUpdateProps, id},
        })
    const dismiss = () => dispatch({type: 'DISMISS_TOAST', toastId: id})

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...toastProps,
            id,
            open: true,
            onOpenChange: (open: boolean) => {
                if (!open) {
                    dismiss()
                }
            },
        } as ToasterToast,
    })

    // 자동으로 3초 후 dismiss (애니메이션 시작)
    setTimeout(() => {
        dispatch({type: 'DISMISS_TOAST', toastId: id})
    }, TOAST_REMOVE_DELAY)

    return {
        id,
        dismiss,
        update,
    }
}

function useToastHook() {
    const [state, setState] = React.useState<State>(memoryState)

    React.useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({type: 'DISMISS_TOAST', toastId}),
    }
}

type ToastActionElement = React.ReactElement<typeof ToastAction>

interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    id: string
    open: boolean
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}

const ToastClose = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(({className, ...props}, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const toastElement = e.currentTarget.closest('[data-toast-id]')
        const toastId = toastElement?.getAttribute('data-toast-id')
        if (toastId) {
            dispatch({type: 'DISMISS_TOAST', toastId})
        }
    }

    return (
        <button
            ref={ref}
            className={cn(
                'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
                className,
            )}
            data-toast-close=""
            onClick={handleClick}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
    )
})
ToastClose.displayName = 'ToastClose'

const ToastAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
    ({className, ...props}, ref) => (
        <button
            ref={ref}
            className={cn(
                'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
                className,
            )}
            {...props}
        />
    ),
)
ToastAction.displayName = 'ToastAction'

function Toast({id, title, description, action, className, open, ...props}: ToastProps) {
    return (
        <div
            className={cn(
                'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border bg-gray-900 p-4 pr-8 shadow-lg transition-all',
                open
                    ? 'animate-in slide-in-from-bottom-4 fade-in duration-300'
                    : 'animate-out slide-out-to-bottom-4 fade-out duration-300',
                className,
            )}
            data-state={open ? 'open' : 'closed'}
            {...props}
        >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div className="flex-1 grid gap-1">
                {title && <div className="text-sm font-semibold text-white">{title}</div>}
                {description && <div className="text-sm text-gray-300">{description}</div>}
            </div>
            {action}
            <ToastClose />
        </div>
    )
}

const ToastProvider = React.createContext<{
    toast: typeof toast
} | null>(null)

export function useToast() {
    const context = React.useContext(ToastProvider)

    if (!context) {
        throw new Error('useToast must be used within a Toaster')
    }

    return context
}

const Toaster = () => {
    const {toasts} = useToastHook()

    return (
        <ToastProvider.Provider value={{toast}}>
            <div className="fixed bottom-4 left-1/2 z-100 flex max-h-screen w-full -translate-x-1/2 flex-col items-center gap-2 p-4 md:max-w-[420px]">
                {toasts.map(function ({id, title, description, action, open, ...props}) {
                    return (
                        <Toast
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            action={action}
                            open={open ?? true}
                            data-toast-id={id}
                            {...props}
                        />
                    )
                })}
            </div>
        </ToastProvider.Provider>
    )
}

export {Toaster, toast, ToastAction}
