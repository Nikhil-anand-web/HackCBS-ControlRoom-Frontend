import React from 'react'

const Home = () => {

  const logout = () => {
      sessionStorage.clear();
      window.location.reload();
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
