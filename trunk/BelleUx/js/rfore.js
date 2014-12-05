var BH_inst = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
        { name: 'Doppler Lidar' },
        { name: 'Wind Profiling Radar' },
        { name: 'Sonic Anemometer' },
        { name: 'Cup Anemometer' },
        { name: 'Microwave Radiometer' }
        
    ]
});
BH_inst.initialize();

var BH_meas = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
        { name: 'Temperature' },
        { name: 'Relative Humdity' },
        { name: 'Wind Profile' },
        { name: 'Wind Direction' },
        { name: 'Wind Speed' },
    ]
});
BH_meas.initialize();

$(function(){

    $('nav form[role=search] input[type=text]').typeahead({
        highlight: true
    },{
        displayKey: 'name',
        source: BH_meas.ttAdapter()
    },{
        displayKey: 'name',
        source: BH_inst.ttAdapter()
    });
    
    $('#login,#logout').click(function(){
        if ($('#login').attr('data-logged-in')) {
            $('#login').removeAttr('data-logged-in').show();
            $('#logout').hide();
            $('#internal').hide();
            
        } else {
            $('#login').attr('data-logged-in', 'yes').hide();
            $('#logout').show();
            $('#internal').show();
        }
    });
    
});
