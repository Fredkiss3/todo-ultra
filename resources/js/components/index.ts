import register from 'preact-custom-element'
import { Select } from './select'
import { PasswordInputToggle } from './password-input-toggle'

register(Select, 'custom-select', ['options'])
register(PasswordInputToggle, 'password-input-toggle', ['hidden-text', 'visible-text', 'field-id'])
