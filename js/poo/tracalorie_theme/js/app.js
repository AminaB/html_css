class CalorieTracker{
    // public methods

    constructor() {
        this._calorieLimit=Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories(0);
        this._meals=Storage.getMeals();
        this._workouts=Storage.getWorkouts();

        this._displayCaloriesLimit();
        this._displayCalories();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
        document.getElementById('limit').value=this._calorieLimit;

    }
    loadItems() {
        this._meals.forEach((meal) => this._displayItem('meal',meal));
        this._workouts.forEach((workout) => this._displayItem('workout',workout));
    }
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories+=meal._calories;
        Storage.updateCalories(this._totalCalories);
        Storage.saveMeal(meal);
        this._render();
        this._displayItem('meal', meal);
    }
    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories-=workout._calories;
        Storage.updateCalories(this._totalCalories);
        Storage.saveWorkout(workout);
        this._render();
        this._displayItem('workout', workout)
    }
    removeMeal(id){
        const index= this._meals.findIndex(meal => meal.id === id);
        if(index !== -1){
            const meal=this._meals[index];
            this._meals.splice(index, 1);
            this._totalCalories-=meal._calories;
            Storage.updateCalories(this._totalCalories);
            Storage.removeMeal(id);
            this._render();
        }

    }
    removeWorkout(id){
        const index= this._workouts.findIndex(meal => meal.id === id);
        if(index > -1){
            const workout=this._workouts[index];
            this._workouts.splice(index, 1);
            this._totalCalories+=workout._calories;
            Storage.updateCalories(this._totalCalories);
            Storage.removeWorkout(id);
            this._render();
        }
    }
    // private methods
    _displayCalories(){
        const totalCaloriesEl= document.getElementById('calories-total')
        totalCaloriesEl.innerHTML=this._totalCalories;
    }
    _displayItem(type,item){
        //console.log(item);
        const itemsListEl= document.getElementById(`${type}-items`);
        const div = document.createElement('div');
        div.classList.add('card', 'my-2');
        div.setAttribute('data-id', item.id);
        div.innerHTML= `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${item._name}</h4>
                    ${type === 'workout'
                    ? `<div  class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                        ${item._calories}
                    </div>`
                    : `<div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                        ${item._calories}
                    </div>`
                    }
                   
                    <button class="delete btn btn-danger btn-sm mx-2">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        `;
        itemsListEl.appendChild(div);
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal._calories, 0);
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workout) => total + workout._calories, 0);
        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const progressEl = document.getElementById('calorie-progress');
        const remain=this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.innerHTML=remain;
        if(remain<0){
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            progressEl.classList.add('bg-danger');
            progressEl.classList.remove('bg-success');
        }else{
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            progressEl.classList.add('bg-success');
            progressEl.classList.remove('bg-danger');
        }
    }
    _displayCaloriesLimit(){
        const caloriesLimitEl= document.getElementById('calories-limit');
        caloriesLimitEl.innerHTML=this._calorieLimit;
    }
    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;

    }
    _render(){
        this._displayCalories();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

    }

    reset() {
        this._totalCalories=0;
        this._meals=[];
        this._workouts=[];
        Storage.clearAll();
        this._render();
    }

    setLimit(caloriesLimit) {
        this._calorieLimit=caloriesLimit;
        Storage.setCalorieLimit(caloriesLimit);
        this._displayCaloriesLimit();
        this._render();
    }
}
class Meal{
    constructor(name, calories) {
        this._name = name;
        this._calories = calories;
        this.id=Math.random().toString(16).slice(2);
    }
}
class Workout{
    constructor(name, calories) {
        this._name = name;
        this._calories = calories;
        this.id=Math.random().toString(16).slice(2);
    }
}
class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultCalories = 0) {
        let totalCalories;
        if (localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultCalories;
        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static updateCalories(calories) {
        localStorage.setItem('totalCalories', calories);
    }
    static getMeals() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }
    static getWorkouts() {
        let workouts;
        if (localStorage.getItem('workouts') === null) {
            workouts = [];
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }
    static saveMeal(meal) {
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    }
    static saveWorkout(workout) {
        const workouts = Storage.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }
    static removeMeal(id) {
        const meals = Storage.getMeals();
        meals.forEach((meal, index) => {
            if (meal.id === id) {
                meals.splice(index, 1);
            }
        });
        localStorage.setItem('meals', JSON.stringify(meals));
    }
    static removeWorkout(id) {
        const workouts = Storage.getWorkouts();
        workouts.forEach((workout, index) => {
            if (workout.id === id) {
                workouts.splice(index, 1);
            }
        });
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static clearAll() {
        localStorage.clear();
    }
}
class App{
    constructor() {
        this._tracker= new CalorieTracker();
        this._eventListeners();
        this._tracker.loadItems();

    }
    _eventListeners(){
        document.getElementById('meal-form')
            .addEventListener('submit', this._newItem.bind(this,'meal'));
        document.getElementById('workout-form')
            .addEventListener('submit', this._newItem.bind(this,'workout'));
        document.getElementById('meal-items')
            .addEventListener('click',this._removeItem.bind(this,'meal'));
        document.getElementById('workout-items')
            .addEventListener('click',this._removeItem.bind(this,'workout'));
        document.getElementById('filter-meals')
            .addEventListener('keyup', this._filterItems.bind(this,'meal'));
        document.getElementById('filter-workouts')
            .addEventListener('keyup', this._filterItems.bind(this,'workout'));
        document.getElementById('reset')
            .addEventListener('click', this._reset.bind(this));
        document.getElementById('limit-form')
            .addEventListener('submit', this._setLimit.bind(this));
    }
    _removeItem(type,e){

        if(e.target.classList.contains('delete')
        || e.target.classList.contains('fa-xmark')) {
            if (confirm('Are you sure?')) {
               // console.log(type);
                const id = e.target.closest('.card').getAttribute('data-id');
                if (type === 'workout') {
                    this._tracker.removeWorkout(id);
                } else {
                    this._tracker.removeMeal(id);
                }
                e.target.closest('.card').remove();
            }
        }
    }
    _newItem(type,e){
        e.preventDefault();
        const name=document.getElementById(`${type}-name`);
        const calories=document.getElementById(`${type}-calories`);

        if(name.value==='' || calories.value===''){
            alert('Please fill in all fields');
            return;
        }
        if(type==='workout') {
            this._tracker.addWorkout(new Workout(name.value, +calories.value));
        }else{
            this._tracker.addMeal(new Meal(name.value, +calories.value));
        }
        name.value='';
        calories.value='';
        const collapse=document.getElementById(`collapse-${type}`);
        const btCollapse=new bootstrap.Collapse(collapse,{
            toogle:true,
        });
    }
    _filterItems(type,e){
        const text= e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach(
            item=>{
                const name=item.firstElementChild.firstElementChild.textContent;
                if(name.toLowerCase().indexOf(text)!==-1){
                    item.style.display='block';
                }else{
                    item.style.display='none';
                }
            }
        )
    }
    _reset(){
        if (confirm('Are you sure you want to reset everything?')) {
            this._tracker.reset();
            document.getElementById('meal-items').innerHTML = '';
            document.getElementById('workout-items').innerHTML = '';
            document.getElementById('filter-meals').innerHTML = '';
            document.getElementById('filter-workouts').innerHTML = '';
        }

    }
    _setLimit(e){
        e.preventDefault();
        const limit = document.getElementById('limit');
        if(limit.value===''){
            alert('please add a limit');
            return;
        }
        this._tracker.setLimit(+limit.value);
        limit.value='';
        const modalEl= document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }
}
const app = new App();
