import { h } from 'preact'
import { useEffect } from 'preact/hooks'

type SelectProps = {
  options: string[]
}

export function Select({}: SelectProps) {
  useEffect(() => {
    console.log('Custom preact element')
  }, [])
  return <div class="text-lg text-red-400">Hello from preact</div>
}
