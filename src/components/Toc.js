import React, { Component } from "react";

class Toc extends Component {
  shouldComponentUpdate(newProps, newState){
    console.log('====>shouldComponentUpdate TOC')
    if(this.props.data === newProps.data){
      return false;
    }else{
      return true;
    }
  }
  render() {
    console.log('render TOC')

    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].html}
            onClick={function(id, e) {
              e.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          >
            {data[i].title}
          </a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default Toc;
