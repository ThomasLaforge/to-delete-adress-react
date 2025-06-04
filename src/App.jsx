import { useThrottle } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [state, setState] = useState('')
  const [propositions, setPropositions] = useState([])
  const debouncedSearchTerm = useThrottle(state, 500);

  const maRef = useRef(null)

  useEffect(() => {
    if (maRef.current) {
      maRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if(propositions.length === 1 && propositions[0] === debouncedSearchTerm) {
      setPropositions([])
    }
  }, [debouncedSearchTerm, propositions]);

  useEffect(() => {
    const getPropositions = async () => {
      const response = await fetch('https://api-adresse.data.gouv.fr/search/?q='+debouncedSearchTerm)
      const data = await response.json()
      setPropositions(data.features.map((feature) => feature.properties.label))
    }
    if(debouncedSearchTerm.length >= 3 && debouncedSearchTerm.length <= 200) {
      getPropositions()
    }
  }, [debouncedSearchTerm])

  return (
    <div>
      <form>
        <input type="text" 
          ref={maRef}
          value={state}
          onChange={(e) => {
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
