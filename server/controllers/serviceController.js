
const serviceController = {}
serviceController.createServiceAccount =  async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:3000/api/serviceaccounts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${res.locals.authorization}`,
      },
      body: JSON.stringify({
        'name': 'grafana',
        'role': 'Admin',
        'isDisabled': false
      })
    })
    const data = await response.json();
    res.locals.serviceAccount = data
    return next();
  }
  catch(err) {
    return next(err)
  }
  
}

serviceController.createToken = async (req, res, next) => {
  try {
    const response = await fetch(`http://localhost:3000//api/serviceaccounts/${res.locals.serviceAccount.id}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${res.locals.authorization}`,
      },
      body: JSON.stringify({
        'name': 'grafana',
        'role': 'Admin'
      })
    })
    const data = await response.json();
    res.locals.token = data;
    return next()
  }
  catch(err) {
    return next(err)
  }
}


module.exports = serviceController