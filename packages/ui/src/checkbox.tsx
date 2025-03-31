import { cn } from '@fintrack/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

const Checkbox = (props: CheckboxProps) => {
  const { className, ...rest } = props

  return (
    <CheckboxPrimitive.Root
      className={cn(
        'border-primary ring-offset-background peer size-4 shrink-0 rounded-xs border',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <CheckIcon className='size-4' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
