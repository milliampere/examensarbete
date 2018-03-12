// Saves options to chrome.storage
function save_options() {
    var sex = document.getElementById('sex').value;
    var isPregnant = document.getElementById('isPregnant').checked;
    var isBreastfeeding = document.getElementById('isBreastfeeding').checked;
    var ageYear = document.getElementById('ageYear').value;
    var lengthCm = document.getElementById('lengthCm').value;
    var weightKg = document.getElementById('weightKg').value;
    var PAL = document.getElementById('PAL').value; 

    chrome.storage.sync.set({
      sex: sex,
      isPregnant: isPregnant,
      isBreastfeeding: isPregnant,
      ageYear: ageYear,
      lengthCm: lengthCm,
      weightKg: weightKg,
      PAL: PAL 
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Inställningar sparade.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value sex = 'woman' etc.
    chrome.storage.sync.get({
      sex: 'woman',
      isPregnant: false,
      isBreastfeeding: false,
      ageYear: "35",
      lengthCm: "165",
      weightKg: "55", 
      PAL: "1.65"     
    }, function(items) {
      document.getElementById('sex').value = items.sex;
      document.getElementById('isPregnant').checked = items.isPregnant;
      document.getElementById('isBreastfeeding').checked = items.isBreastfeeding;
      document.getElementById('ageYear').value = items.ageYear;
      document.getElementById('lengthCm').value = items.lengthCm;
      document.getElementById('weightKg').value = items.weightKg;
      document.getElementById('PAL').value = items.PAL; 
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);