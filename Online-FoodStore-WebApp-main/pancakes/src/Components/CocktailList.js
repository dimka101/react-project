import React, { Component } from "react";
import "./styles.css"; // Подключаем CSS файл

export default class NewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.drinks,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p className="error">Error: {error.message}</p>;
    } else if (!isLoaded) {
      return <p className="loading">Loading...</p>;
    } else {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.idDrink}>
              {item.strDrink}
              <img width="50" height="50" src={item.strDrinkThumb} alt={item.strDrink} />
            </li>
          ))}
        </ul>
      );
    }
  }
}
