import { useEffect, useMemo, useState } from "react"

export default function App() {
  const [state, setState] = useState('')
  const [propositions, setPropositions] = useState([])

  const longueurState = useMemo(() => {
    return state.length
  }, [state])

  useEffect(() => {
    const getPropositions = async () => {
      const response = await fetch('https://api-adresse.data.gouv.fr/search/?q='+state)
      const data = await response.json()
      if(data.features[0].properties.label === state) {
        setPropositions([])
      }
      else {
        setPropositions(data.features.map((feature) => feature.properties.label))
      }
    }
    if(state.length >= 3){
      getPropositions()
    }
  }, [state])

  return (
    <div>
      <form>
        <input type="text" 
          value={state}
          onInput={(e) => {
            setState(e.target.value)
          }}
        />
        <div className="list">
          {propositions.map((proposition, id) => (
            <div key={id} onClick={() => {
              setState(proposition)
            }}>{proposition}</div>
          ))}
        </div>
      </form>
    </div>
  )
}
