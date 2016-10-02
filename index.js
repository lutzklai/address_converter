(function(addressConverter, undefined){
  //Most recent convert data (available to global scope)
  addressConverter.input = '';
  addressConverter.output = '';
  addressConverter.type = '';
  //Dom elements
  var input = document.getElementById('convert-input');
  var tableType = document.getElementById('table-convert-type');
  var tableInput = document.getElementById('table-convert-input');
  var tableOutput = document.getElementById('table-convert-output');

  input.addEventListener('input', inputEvent);

  function inputEvent(event){
    var value = event.target.value;
    value = value.replace(/ /g, '');

    if(value === ''){
      tableType.innerHTML = '';
      tableInput.innerHTML = '';
      tableOutput.innerHTML = '';
      return true;
    }

    tableInput.innerHTML = value;

    var hasColon = value.toString().indexOf(':');
    //If input has colon remove, else add colons
    if(hasColon > -1){
      var output = removeColons(value);
    }else{
      var output = addColons(value);
    }
    tableType.innerHTML = output.type;
    tableOutput.innerHTML = output.value;

    input.value = output.value;
    input.select();

    addressConverter.input = value;
    addressConverter.output = output.value;
    addressConverter.type = output.type;
  }
  function addColons(input){
    var length = input.toString().length;
    var output = '';

    switch(length){
      case 12:
        var type = 'Add Colons - MAC';
        for(var c = 0; c < 6; c++){
          output += c !== 5 ? input.substr((c*2), 2) + ':' : input.substr((c*2), 2);
        }
      break;
      case 16:
        var type = 'Add Colons - FC';
        for(var c = 0; c < 8; c++){
          output += c !== 7 ? input.substr((c*2), 2) + ':' : input.substr((c*2), 2);
        }
      break;
      case 24:
        var type = 'Add Colons - InfiniBand';
        for(var c = 0; c < 6; c++){
          output += c !== 5 ? input.substr((c*4), 4) + ':' : input.substr((c*4), 4);
        }
      break;
      default:
        var type = 'Invalid Format';
        output = 'Invalid';
      break;
    }

    return {
      value: output,
      type: type
    }
  }
  function removeColons(input){
    var input = input.replace(/:/g, '');
    var length = input.toString().length;

    switch(length){
      case 12:
        var type = 'Remove Colons - MAC';
        var output = input;
      break;
      case 16:
        var type = 'Remove Colons - FCC';
        var output = input;
      break;
      case 24:
        var type = 'Remove Colons - InfiniBand';
        var output = input;
      break;
      default:
        var type = 'Invalid Format';
        var output = 'Invalid';
      break;
    }

    return {
      value: output,
      type: type
    }
  }

}(window.addressConverter = window.addressConverter || {}))
