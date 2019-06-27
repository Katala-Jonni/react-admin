export const loadData = ({ login, password }) => fetch(`https://loft-taxi.glitch.me/auth?username=${login}&password=${password}`)
  .then(res => res.json())
  .catch(error => console.log(error));