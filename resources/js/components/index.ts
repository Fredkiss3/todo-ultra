import register from 'preact-custom-element'
import { PasswordInputToggle } from './password-input-toggle'

register(PasswordInputToggle, 'password-input-toggle', ['hidden-text', 'visible-text', 'field-id'])
