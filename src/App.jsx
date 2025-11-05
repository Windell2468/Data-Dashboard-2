import { useState, useEffect, useMemo } from 'react'
// A Link Component is from the react-router-dom that can enable client-side navigation between routes
import { Link } from 'react-router-dom'
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts' 
import './App.css'

function App() {
  //The state for storing to fetch array of Disney Characters
  const [characters, setCharacters] = useState([])
  // The State to manage the loading status during with Application Programming Interface (API)
  const [isLoading, setIsLoading] = useState(true)
  //The text box for input for search disney charecter name
  const [search, setSearch] = useState("")
  // Choose flim in the dropdown filter
  const [chooseFilm, setChooseFilm] = useState("All")

  //  Fetch Disney character data
  useEffect(() => { //
    async function disneyFetch() { //
      try {
        const response = await fetch("https://api.disneyapi.dev/character") //
        const data = await response.json()
        // Update state with fetched Disney Characters
        setCharacters(data.data) //
        setIsLoading(false) //
      } catch (error) { //
        console.log("Error fetching Disney character data:", error) 
        setIsLoading(false) //
      }
    }
    disneyFetch() 
  }, []) //Empty dependency array

  // Compute stats and chart data using useMemo
  const { optionsFilm, charactersWithFilms, avgFilmsPerChar, topFilmChartData, filmPresenceData,
  } = useMemo(() => { //
    const filmCounts = {} // It stores the number of Disney Characters of films
    let totalFilms = 0  // The total number of disney films across all Disney characters
    let charsWithFilms = 0 // There is a count of Disney characters with least one film
    //It loop through Disney Characters and Count Films
    characters.forEach((c) => { //
      const films = Array.isArray(c.films) ? c.films : [] //disney films is an array
      if (films.length > 0) charsWithFilms += 1  // Counted characters in Films
      totalFilms += films.length // Add a number  of films with average calculation
      //It counts how many disney characters are associated  with each Disney films
      films.forEach((f) => { 
        if (!f) return // null film names
        filmCounts[f] = (filmCounts[f] || 0) + 1 //
      })
    })
    // Sort films by popularity and select top 30
    const sortedFilms = Object.entries(filmCounts) //
      .sort((a, b) => b[1] - a[1]) //
      .map((entry) => entry[0]) //

    const topFilms = sortedFilms.slice(0, 30) //
    const options = ["All", ...topFilms] // It is dropdown options that includes ALL
    const avg = characters.length > 0 ? totalFilms / characters.length : 0 // It can calculate average disney films per character 

    // Bar Chart Data (top 5 Disney Films)
    const topFilmChartData = Object.entries(filmCounts) 
      .sort((a, b) => b[1] - a[1]) //
      .slice(0, 5) //
      .map(([film, count]) => ({ film, count })) //
    // Pie Chart Data ( Disney Characters With vs Without)
    const filmPresenceData = [ //
      { name: "With Films", value: charsWithFilms }, //
      { name: "Without Films", value: characters.length - charsWithFilms }, //
    ]
    //It return all computed values
    return { 
      optionsFilm: options, 
      charactersWithFilms: charsWithFilms, 
      avgFilmsPerChar: avg, 
      topFilmChartData, 
      filmPresenceData, 
    }
  }, [characters]) //

  // Filter logic for search + film selection
  const filteredCharacters = characters //
    .filter((char) => //
      char.name.toLowerCase().includes(search.trim().toLowerCase()) //
    )
    .filter((char) => { //
      if (chooseFilm === "All") return true // It show  all if "All" is choosed
      const films = Array.isArray(char.films) ? char.films : [] //
      return films.includes(chooseFilm)  //It only including disney characters from choosing disney film 
    })

  return ( //
    <div className="app">
      <div className="main">
        <h1>Disney Characters Data Dashboard</h1> 

        {isLoading ? ( 
          <p>Loading characters...</p> //It shows a loading message while it fetches a disney character
        ) : (
          <div>
            {/* Disney Summary */}
            <section className="summary">
              <div className="stat">
                <strong>Total characters fetched:</strong> {characters.length} 
              </div>
              <div className="stat">
                <strong>Characters with films:</strong> {charactersWithFilms}
              </div>
              <div className="stat">
                <strong>Avg. films per character:</strong>{" "}
                {avgFilmsPerChar.toFixed(2)}
              </div>
            </section>

            {/* Disney Charts */}
            <section className="charts">
              <h2>Disney Data Insights</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {/*Disney Bar Chart */}
                <div style={{ width: "45%", minWidth: "300px", height: "190px" }}>
                  <h3>Top 5 Disney Films by Disney Character Count</h3> 
                  <ResponsiveContainer> 
                    <BarChart data={topFilmChartData}> 
                      {/*This X-axis uses disney films names */}
                      <XAxis dataKey="film" hide /> 
                      {/*This Y-axis represents of number of disney characters */}
                      <YAxis />
                      {/*This Tooltip that shows disney data details of hover */}
                      <Tooltip />
                      {/*The Legend that displyed color labels */}
                      <Legend />
                      {/*The Bar Display disney character count for each disney film */}
                      <Bar dataKey="count" fill="	#1ab28a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Disney Pie Chart */}
                <div style={{ width: "50%", minWidth: "200px", height: "300px" }}>
                  <h3>Disney Characters With vs Without Films</h3>
                  <ResponsiveContainer>
                    <PieChart> 
                      <Pie //
                        data={filmPresenceData} //
                        dataKey="value" //
                        nameKey="name" //
                        cx="50%" //
                        cy="50%" //
                        outerRadius={80} //
                        label
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#db3333ff" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/*  Search and Filter */}
            <section className="controls">
              <input
                type="text"
                placeholder="Search Disney Characters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} //It updates the state
                className="search-bar"
              />

              <label>
                <span>Filter by film:</span>
                <select
                  value={chooseFilm}
                  onChange={(e) => setChooseFilm(e.target.value)} // It updates the disney film filter
                >
                  {optionsFilm.map((film) => ( //
                    <option key={film} value={film}> 
                      {film} 
                    </option>
                  ))}
                </select>
              </label> 
            </section>

            {/*  Disney Character List */}
            <section className="results">
              <p>
                Showing {Math.min(filteredCharacters.length, 10)} of{" "} 
                {filteredCharacters.length} matching characters 
              </p>
              <ul>
                {filteredCharacters.slice(0, 10).map((char) => ( //
                  <li key={char._id} className="characters-row">
                    <Link to={`/character/${char._id}`} className="char-link">
                      <div className="char-name">{char.name}</div> 
                      <div className="char-feature">
                        {char.films && char.films.length > 0 ? (
                          <span>Film: {char.films[0]}</span> //
                        ) : (
                          <span>No film listed</span> //
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* No Results */}
            {filteredCharacters.length === 0 && (
              <p>
                No Disney Characters found matching "{search}" and film " 
                {chooseFilm === "All" ? "Any" : chooseFilm}". 
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
