import React from "react";
import ToyCard from "../components/ToyCard";
import ToyForm from "../components/ToyForm";
import ToySearch from "../components/ToySearch";
import { connect } from "react-redux";
import { fetchToys, addLike } from "../actions/toyActions";

// Class components will always rerender when state or props change
class ToysContainer extends React.Component {
  state = {
    search: "",
  };

  componentDidMount() {
    this.props.fetchToys();
  }

  renderToyCards() {
    if (this.props.loading) {
      return <h2>LOADING TOYS...</h2>;
    }

    let displayedToys;
    if (this.state.search) {
      displayedToys = this.props.toys.filter((toy) =>
        toy.name.toLowerCase().includes(this.state.search.toLowerCase())
      );
    } else {
      displayedToys = this.props.toys;
    }

    return displayedToys.map((toy) => {
      return <ToyCard key={toy.id} toy={toy} addLike={this.props.addLike} />;
    });
  }

  handleSearchChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div id="toy-container">
        <ToyForm />
        <ToySearch
          search={this.state.search}
          handleChange={this.handleSearchChange}
        />
        {this.renderToyCards()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return state;
};

export default connect(mapStateToProps, { fetchToys, addLike })(ToysContainer);