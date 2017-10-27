var React = require('react')
var expect = require('chai').expect
var App = require('../../src/components/App.jsx')
var enzyme = require('enzyme')
var shallow = enzyme.shallow

var Adapter = require('enzyme-adapter-react-16')
enzyme.configure({ adapter: new Adapter() })

describe('<App />', function() {
  it('runs successfully', function(done) {
    var wrapper = shallow(<App />)
    expect(wrapper.find('span')).to.have.length(1)
    done()
  })
})