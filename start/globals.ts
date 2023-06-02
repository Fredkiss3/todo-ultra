/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'
import Cache from '@ioc:Adonis/Addons/Cache'
import { cn } from '../resources/js/shared-utils'

View.global('clsx', cn)
View.global('cache', Cache)
