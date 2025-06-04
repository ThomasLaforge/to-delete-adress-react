import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function App() {
  const [state, setState] = useState('')
  const [propositions, setPropositions] = useState([])
  const debouncedSearchTerm = useDebounce(state, 500);

  useEffect(() => {
    const getPropositions = async () => {
      const response = await fetch('https://api-adresse.data.gouv.fr/search/?q='+debouncedSearchTerm)
      const data = await response.json()
      if(data.features[0].properties.label === debouncedSearchTerm) {
        setPropositions([])
      }
      else {
        setPropositions(data.features.map((feature) => feature.properties.label))
      }
    }
    if(debouncedSearchTerm.length >= 3){
      getPropositions()
    }
  }, [debouncedSearchTerm])

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
      <h2>Les pommes</h2>
      <p>Les pommes c&apos;est trop bon en vrai de vrai !</p>
    </div>
  )
}
