import { h } from 'preact'
import { Eye, EyeClosed, EyeSlash } from 'phosphor-react'
import { useState } from 'preact/hooks'

export type PasswordInputToggleProps = {
  'hidden-text': string
  'visible-text': string
  'field-id': string
}

export function PasswordInputToggle({
  'hidden-text': hiddenText,
  'visible-text': visibleText,
  'field-id': fieldId,
}: PasswordInputToggleProps) {
  const [hidden, setHidden] = useState(true)

  return (
    <button
      type={'button'}
      class="inline-block"
      onClick={() => {
        setHidden(!hidden)

        const field = document.getElementById(fieldId) as HTMLInputElement | null
        if (field) {
          field.type = hidden ? 'text' : 'password'
        }
      }}
    >
      <span class="sr-only">{hidden ? hiddenText : visibleText}</span>
      {hidden ? (
        <EyeSlash weight="duotone" className="h-4 w-4" />
      ) : (
        <Eye weight="duotone" className="h-4 w-4" />
      )}
    </button>
  )
}
