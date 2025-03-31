import { cn } from '@fintrack/utils'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>

const Separator = (props: SeparatorProps) => {
  const { className, orientation = 'horizontal', decorative = true, ...rest } = props

  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...rest}
    />
  )
}

export { Separator }
