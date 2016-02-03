(function (R, RD, D){
  var md = R.createClass({
    getInitialState: function getInitialState () {
      return { value: '## This site is powered by MoNoApps' };
    },
    handleChange: function handleChange () {
      this.setState({ value: this.refs.textarea.value });
    },
    rawMarkup: function rawMarkup () {
      return { __html: marked(this.state.value, { sanitize: true }) };
    },
    render: function render () {
      return R.createElement(
        "div",
        { className: 'row'},
        R.createElement('textarea', {
          onChange: this.handleChange,
          ref: 'textarea',
          defaultValue: this.state.value,
          className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
        }),
        R.createElement('div', {
          className: 'content',
          dangerouslySetInnerHTML: this.rawMarkup()
        })
      );
    }
  });
  
  RD.render(
    R.createElement(md, null),
    D.getElementById('mdeditor')
  );

})(React, ReactDOM, document);

