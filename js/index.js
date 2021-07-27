const seattleDropDown = document.querySelector('#seattle');
seattleDropDown.addEventListener('mouseover', function() {
  this.classList.remove('closed');
});
seattleDropDown.addEventListener('mouseout', function() {
  this.classList.add('closed');
});
