import Karakter from './karakter.js';

let karakterek = []; 

document.addEventListener('DOMContentLoaded', function() {
  karakterek.push(new Karakter('Gandalf', 'witch', 1, 2, 3));
  karakterek.push(new Karakter('Legolas', 'archer', 4, 5, 6));
  karakterek.push(new Karakter('Aragorn', 'warrior', 7, 8, 9));
  mngCharacter();
  renderCharacterList();
});


function renderCharacterList() {
  const list = document.querySelector('.character-list');
  list.innerHTML = '';

  karakterek.forEach(karakter => {
      list.appendChild(renderCharacter(karakter,true));
  });
  list.appendChild(createAddButton());
}

function createAddButton() {
  const colDiv = document.createElement('div');
  colDiv.classList.add('col-6','col-sm-6', 'col-md-4', 'col-lg-4');

  const card = document.createElement('div');
  card.classList.add('card', 'text-center', 'add-card');
  card.setAttribute('data-bs-toggle', 'offcanvas');
  card.setAttribute('data-bs-target', '#hozzaadasOC');
  card.setAttribute('aria-controls', 'hozzaadasOC');
  card.addEventListener('click', function() {
      mngCharacter();
  });
  colDiv.appendChild(card);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);
  cardBody.innerHTML = '<p style="margin: 30px;"><i class="fas fa-plus fa-x3"></i></p>';

  return colDiv;
}

function renderCharacter(karakter, edit = false) {
  const colDiv = document.createElement('div');
  colDiv.classList.add('col-6','col-sm-6', 'col-md-4', 'col-lg-4');

  const card = document.createElement('div');
  card.classList.add('card', karakter.getColor());
  colDiv.appendChild(card);

  const row = document.createElement('div');
  row.classList.add('row', 'g-0');
  card.appendChild(row);

  const imgCol = document.createElement('div');
  imgCol.classList.add('col');
  row.appendChild(imgCol);

  const img = document.createElement('img');
  img.src = karakter.getImage();
  img.classList.add('img-fluid', 'rounded-start');
  img.alt = karakter.name;
  imgCol.appendChild(img);

  const statsCol = document.createElement('div');
  statsCol.classList.add('col-md-7', 'stats');
  row.appendChild(statsCol);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  statsCol.appendChild(cardBody);

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.innerHTML = karakter.name + ' <span class="badge text-bg-dark">' + karakter.cast.toUpperCase() + '</span>';
  cardBody.appendChild(title);

  const health = createStat('Életerő', karakter.health, 'bg-success');
  cardBody.appendChild(health);

  const strength = createStat('Erő', karakter.strength, 'bg-warning');
  cardBody.appendChild(strength);

  const defense = createStat('Védelem', karakter.defense, 'bg-danger');
  cardBody.appendChild(defense);

  if (!edit) {
      return colDiv;
  }
  card.addEventListener('click', function() {
      mngCharacter(karakter,true);
  });
  card.setAttribute('data-bs-toggle', 'offcanvas');
  card.setAttribute('data-bs-target', '#szerkesztesOC');
  card.setAttribute('aria-controls', 'szerkesztesOC');
  
  return colDiv;
}

function createStat(statName, statValue, color){
  const div = document.createElement('div');
  div.classList.add('mb-2');

  const span = document.createElement('span');
  span.innerHTML = statName;
  div.appendChild(span);

  const progress = document.createElement('div');
  progress.classList.add('progress');
  div.appendChild(progress);

  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar', color);
  progressBar.style.width = statValue/20*100 + '%';
  progressBar.setAttribute('aria-valuenow', statValue);
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  progress.appendChild(progressBar);

  return div;
}

function createElementWithClass(type, className, parent) {
  const element = document.createElement(type);
  if (type == 'select') {
    const inputLabel = createElementWithClass('label', 'form-label', parent);
    inputLabel.innerHTML = "Kaszt";
  }
  element.className = className;
  if (parent) parent.appendChild(element);
  return element;
}

function createInputField(parent, label, type, value, min = null, max = null, md = 6) {
  const div = createElementWithClass('div', `col-md-${md}`, parent);
  const inputLabel = createElementWithClass('label', 'form-label', div);
  inputLabel.innerHTML = label;
  const input = createElementWithClass('input', 'form-control', div);
  input.type = type;
  input.value = value;
  if (min !== null) input.min = min;
  if (max !== null) input.max = max;
  return input;
}

function mngCharacter(karakter = new Karakter('Név', 'witch', 0, 0, 0), szerk = false) {
  const edit = document.querySelector(`${szerk ? '#szerkesztesOC' : '#hozzaadasOC'} .offcanvas-body`);
  edit.innerHTML = '';
  const render = createElementWithClass('div', 'render', edit);
  render.appendChild(renderCharacter(karakter, false));

  const form = createElementWithClass('form', 'row g-3', edit);

  const nameInput = createInputField(form, 'Név', 'text', karakter.name);
  const classSelect = createElementWithClass('select', 'form-select', createElementWithClass('div', 'col-md-6', form));
  ['witch', 'archer', 'warrior'].forEach(c => {
    const option = createElementWithClass('option', '', classSelect);
    option.value = c;
    option.innerHTML = c.charAt(0).toUpperCase() + c.slice(1);
    option.selected = c === karakter.cast;
  });

  const healthInput = createInputField(form, 'Életerő', 'number', karakter.health, 0, 20, 4);
  const strengthInput = createInputField(form, 'Erő', 'number', karakter.strength, 0, 20, 4);
  const defenseInput = createInputField(form, 'Védelem', 'number', karakter.defense, 0, 20, 4);

  const submit = createElementWithClass('button', 'btn btn-primary ', form);
  submit.type = 'submit';
  submit.setAttribute('data-bs-dismiss', 'offcanvas');
  submit.setAttribute('aria-label', 'Close');
  submit.setAttribute('data-vs-target', '#szerkesztesOC');
  submit.innerHTML = szerk ? 'Mentés' : 'Hozzáadás';

  submit.addEventListener('click', function(event) {
    event.preventDefault();
    karakter.name = nameInput.value;
    karakter.cast = classSelect.value;
    karakter.health = parseInt(healthInput.value);
    karakter.strength = parseInt(strengthInput.value);
    karakter.defense = parseInt(defenseInput.value);
    karakter.validate();
    if (!szerk) {
      karakterek.push(karakter);
    }
    renderCharacterList();
  });
  if (szerk) {
    const del = createElementWithClass('button', 'btn btn-danger ', form);
    del.type = 'submit';
    del.setAttribute('data-bs-dismiss', 'offcanvas');
    del.setAttribute('aria-label', 'Close');
    del.setAttribute('data-vs-target', '#szerkesztesOC');
    del.innerHTML = "Törlés";

    del.addEventListener('click', function(e) {
      e.preventDefault();
      karakterek = karakterek.filter(k => k !== karakter);
      renderCharacterList();
    });
  }

  form.addEventListener('change', function() {
    render.innerHTML = '';
    render.appendChild(renderCharacter(new Karakter(nameInput.value, classSelect.value, parseInt(healthInput.value), parseInt(strengthInput.value), parseInt(defenseInput.value)), false));
  });
}