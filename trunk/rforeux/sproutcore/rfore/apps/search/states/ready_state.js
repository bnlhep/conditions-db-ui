Search.ReadyState = SC.State.extend({ 
  
  enterState: function() {
    Search.getPath('mainPage.mainPane').append();
  },

  exitState: function() {
    Search.getPath('mainPage.mainPane').remove();
  }

});

