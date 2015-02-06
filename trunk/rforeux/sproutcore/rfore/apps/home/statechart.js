Home.statechart = SC.Statechart.create({

  initialState: 'readyState',

  readyState: SC.State.plugin('Home.ReadyState')
  // someOtherState: SC.State.plugin('Home.SomeOtherState')

});
