class CalorieTracker{
    // public methods

    constructor() {
        this._calorieLimit=2000;
        this._totalCalories=0;
        this._meals=[];
        this._workouts=[];

        this._displayCaloriesLimit();
        this._displayCalories();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

    }
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories+=meal._calories;
        this._render();
        this._displayItem('meal', meal)
    }
    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories-=workout._calories;
        this._render();
        this._displayItem('workout', workout)
    }
    // private methods
    _displayCalories(){
        const totalCaloriesEl= document.getElementById('calories-total')
        totalCaloriesEl.innerHTML=this._totalCalories;
    }
    _displayItem(type,item){
        console.log(item);
        const itemsListEl= document.getElementById(`${type}-items`);
        const div = document.createElement('div');
        div.classList.add('card', 'my-2');
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
            console.log('here')
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
class App{
    constructor() {
        this._tracker= new CalorieTracker();
        document.getElementById('meal-form')
            .addEventListener('submit', this._newItem.bind(this,'meal'));
        document.getElementById('workout-form')
            .addEventListener('submit', this._newItem.bind(this,'workout'));
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
}
const app = new App();
