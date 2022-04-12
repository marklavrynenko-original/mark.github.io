let pairs = [
	  ['colorbtn', 'color'],
	  ['datebtn', 'date'],
	  ['datetimebtn', 'datetime'],
	  ['filebtn', 'file'],
	  ['monthbtn', 'month'],
	  ['timebtn', 'time'],
	  ['weekbtn', 'week'],
];
for (let [btnId, inputId] of pairs) {
  const btn = document.getElementById(btnId);
	btn.addEventListener('click', () => {
     console.log('Looking for ', inputId);
     let input = document.getElementById(inputId);
     try {
       console.log(input);
       input.showPicker();
     } catch (e) {
        alert(e);
     }
  });
}