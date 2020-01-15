import React, { Component } from 'react';
import './App.css';
import Toc from './components/Toc';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'read',
      welcome: { title: 'Welcome', desc: 'hello react!!' },
      subject: { title: 'WEB', sub: 'world wide web!!' },
      selected_content_id: 1,
      content: [
        { id: 1, title: 'HTML', desc: 'hypertext markup language' },
        { id: 2, title: 'CSS', desc: 'css is for design' },
        { id: 3, title: 'JavaScript', desc: 'javascript is for interactive' }
      ]
    };
  }

  getReadContent(){

    var i = 0;
      while (i < this.state.content.length) {
        var data = this.state.content[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id = this.max_content_id +1;
        // this.state.content.push(
        //   {id: this.max_content_id ,title: _title, desc: _desc}
        // )
        var _content = this.state.content.concat(
          {id: this.max_content_id ,title: _title, desc: _desc}
        )
        this.setState(
          {content: _content,
          mode: 'read',
          selected_content_id: this.max_content_id}
        )
      }.bind(this)}></CreateContent>;
    }else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title,_desc){
        var _Updatecontent = Array.from(this.state.content);
        var i =0;
        while(i< _Updatecontent.length) {
          if(_Updatecontent[i].id === _id ){
            _Updatecontent[i] = {id: _id , title: _title, desc: _desc}
            break;
          }
          i = i +1;
        }
        this.setState(
          {content: _Updatecontent,
          mode: 'read'}
        )
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  }
  render(h) {
    
    return (
      <div className='App'>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Subject>
        <Toc
          onChangePage={function(id) {
            this.setState({ mode: 'read', selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.content}
        ></Toc>
        <Control
          onChangeMode={function(_mode) {
            if ( _mode === 'delete'){
              if(window.confirm('really delete???')){
                var _content = Array.from(this.state.content);
                var i = 0 ;
                while( i < _content.length){
                  if(_content[i].id === this.state.selected_content_id){
                    _content.splice(i ,1);
                    break;
                  }
                  i = i +1 ;
                }
                this.setState({
                  mode: 'welcome',
                  content: _content
                })
              }
            }else{
              this.setState({ mode: _mode });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}
export default App;
