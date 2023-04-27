import '../css/app.css'
import 'unpoly'

document.addEventListener('DOMContentLoaded', () => {
  up.link.config.followSelectors.push('a[href]')
  up.link.config.preloadSelectors.push('a[href]')
  up.form.config.submitSelectors.push(['form'])
})
