import '../css/app.css'
import './components/index'
import 'unpoly'

/**
 * unpoly configuration
 */
document.addEventListener('DOMContentLoaded', () => {
  up.link.config.followSelectors.push('a[href]')
  up.link.config.preloadSelectors.push('a[href]')
  up.fragment.config.navigateOptions.cache = false
  if (process.env.NODE_ENV !== 'development') {
    up.form.config.submitSelectors.push(['form'])
  }
})
