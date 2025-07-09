import cookyLogo from './assets/cooky.svg'

function App() {

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>Cooky</h1>
      <img src={cookyLogo} className="w-[250px]" alt="Cooky logo" />
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem velit inventore repellat eius consequuntur recusandae quam nam, officia natus magnam est reiciendis? Necessitatibus voluptates inventore veritatis! Praesentium voluptate modi harum.
      </span>
      <span>
        Velit aliquam maiores rerum iusto id, earum natus aut tempora atque? Mollitia maiores vero unde, quas cupiditate est repellat a? Error, labore dolorem. Asperiores dolor deserunt sed totam exercitationem laudantium.
      </span>
    </div>
  )
}

export default App
