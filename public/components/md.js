var Markdown = {
  editor: React.createClass({
    getInitialState: function getInitialState () {
      return { value: this.props.post };
    },
    rawMarkup: function rawMarkup () {
      return { __html: marked(this.state.value, { sanitize: true }) };
    },
    render: function render () {
      return React.createElement(
        "div",
        {},
        React.createElement('div', {
          className: 'content',
          dangerouslySetInnerHTML: this.rawMarkup()
        })
      );
    }
  })
};
