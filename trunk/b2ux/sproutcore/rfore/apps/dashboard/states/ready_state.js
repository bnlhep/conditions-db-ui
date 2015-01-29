Dashboard.ReadyState = SC.State.extend({ 
  
  enterState: function() {
    Dashboard.getPath('mainPage.mainPane').append();
  },

  exitState: function() {
    Dashboard.getPath('mainPage.mainPane').remove();
  }

});

