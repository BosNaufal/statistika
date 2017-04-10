
import React, { PropTypes } from 'react'

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      links: [
        { link: "#/jarak-tunggal", text: "Jarak Tunggal" },
        { link: "#/jarak-kelompok", text: "Jarak Kelompok" },
        { link: "#/kuartil-tunggal", text: "Kuartil Tunggal" },
        { link: "#/simpangan-tunggal", text: "Simpangan" },
        { link: "#/simpangan-kelompok", text: "Simpangan Kelompok" },
        { link: "#/mean-tunggal", text: "Mean Tunggal" },
        { link: "#/mean-kelompok", text: "Mean Kelompok" },
        { link: "#/agregratif-sederhana", text: "Agregratif Sederhana" },
        { link: "#/tabel-hitung", text: "Tabel Hitung" },
      ]
    }
  }

  render () {
    return (
      <div>
        <h1>Ini Kalkulator</h1>
        <ul>
          { this.state.links.map((item, i) => (
            <li key={i}><a href={item.link}>{item.text}</a></li>
          ))}
        </ul>
      </div>
    )
  }

}

export default Home;
