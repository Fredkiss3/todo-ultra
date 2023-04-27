import '../css/app.css'
import 'unpoly'

/**
 * unpoly configuration
 */
document.addEventListener('DOMContentLoaded', () => {
  up.link.config.followSelectors.push('a[href]')
  up.link.config.preloadSelectors.push('a[href]')
  up.form.config.submitSelectors.push(['form'])
  up.fragment.config.navigateOptions.cache = false
})
