import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/login', ({ view }) => view.render('auth/login'))
  Route.get('/register', ({ view }) => view.render('auth/register'))
}).prefix('/auth')
