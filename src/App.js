import React from 'react';
import ReactDOM from 'react-dom';

const content = [
  {
    id: '1',
    avatar: 'https://avatarfiles.alphacoders.com/840/84098.jpg',
    name: 'user001',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, eaque?'
  },
  {
    id: '2',
    avatar: 'https://avatarfiles.alphacoders.com/510/51063.jpg',
    name: 'user002',
    comment: 'Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur'
  },
  {
    id: '3',
    avatar: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-rainbow-unicorn.png',
    name: 'user003',
    comment: ' Veritatis, eaque? Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  },
]

class ControlButton extends React.Component{
  render(){
    return <div
      data-id={this.props.id}
      onClick={this.props.update}
      className={'control-button ' + (this.props.id == this.props.isActive?'is-active-button':'')}>
    </div>
  }
}

class Section extends React.Component{
  render(){
    return(
      <div className='section'>
        <img className='sec-avatar' src={this.props.avatar} />
        <h2 className='sec-name'>{this.props.name}</h2>
        <p className='sec-comment'>{this.props.comment}</p>
      </div>
    )
  }
}

class Add extends React.Component{
  constructor(){
    super();
    this.state = {
      disabled: true,
      isEmptyName: true,
      isEmptyText: true
    }
  }

  checkEmptyName(ev){
    if(ev.target.value.trim().length > 0){
      this.setState({isEmptyName: false})
    } else {
      this.setState({isEmptyName: true})
    }
  }

  checkEmptyText(ev){
    if(ev.target.value.trim().length > 0){
      this.setState({isEmptyText: false})
    } else {
      this.setState({isEmptyText: true})
    }
  }

  agreement(){
    this.setState({
      disabled: !this.state.disabled
    })
  }

  addNew(ev){
    ev.preventDefault();
    let entName = this.refs.entName.value;
    let entAvatar = this.refs.entAvatar.value || 'https://dummyimage.com/100x100/000/fff';
    let text = this.refs.entText;
    let entText = text.value;
    let newComment = {
        id: content.length + 1 + '',
        avatar: entAvatar,
        name: entName,
        comment: entText
      }
    this.props.addPost(newComment);
    text.value = '';
    this.setState({isEmptyText: true})
  }

  render(){
    return(
      <div className='add-comment-form'>
        <form>
          <input
            onChange={this.checkEmptyName.bind(this)}
            ref='entName'
            type='text'
            className='add-author'
            defaultValue=''
            placeholder='name' />
          <input
            ref='entAvatar'
            type='text'
            className='add-avatar'
            placeholder='img url (not necessary)'/>
          <textarea
            ref='entText'
            onChange={this.checkEmptyText.bind(this)}
            className='add-text' defaultValue=''
            placeholder=''
           />
          <label className='add-checkrule'>
            <input
              type='checkbox'
              onChange={this.agreement.bind(this)}/>
              I agree with <a href='#'>this</a>
          </label>
          <button
            onClick={this.addNew.bind(this)}
            className='add-btn'
            disabled={this.state.disabled || this.state.isEmptyName || this.state.isEmptyText}>
            post
          </button>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: content,
      isActive: ''
    }
    this.update = this.changeContent.bind(this)
    this.add = this.addPost.bind(this)
  }

  componentWillMount(){
    let lastPost = content.length;
    if(Number(lastPost) > 6) {
      content.pop()
      lastPost = '6'
      alert('No more than 6 post allowed so far')
    }
    let filtered = this.filter(content, lastPost)
    this.setState({
      content: filtered,
      isActive: lastPost
    });
  }

  filter(array, lookFor){
    return array.filter(item => item.id == lookFor)
  }

  changeContent(ev){
    let searchQuery = ev.target.getAttribute('data-id');
    let filtered = this.filter(content, searchQuery)
    this.setState({
      content: filtered,
      isActive: searchQuery
    });
  }

  addPost(comment){
    content.push(comment)
    this.componentWillMount();
  }

  render() {
    return (
      <div className='app'>
        <Add addPost={this.add}/>
        <div className='slider'>
          <div className='content'>{this.state.content.map(item =>
             <Section
                key={item.id}
                id={item.id}
                avatar={item.avatar}
                name={item.name}
                comment={item.comment} />)}
          </div>
          <div className='control-panel'>{content.map(item =>
            <ControlButton
              isActive={this.state.isActive}
              update={this.update}
              key={item.id}
              id={item.id}
            />)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
