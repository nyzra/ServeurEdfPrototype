class Filter{

    constructor(){
        this._notFilterFiches = []
        this._filterChoice = ""
        this._metierChoice = ""
        this.handler = function(){}
        this.filteredFiches=this.ApplyFilter(this._notFilterFiches)
    }

    set filterChoice(str){
        this._filterChoice=str
        this.filteredFiches=this.ApplyFilter(this._notFilterFiches)
        if(filter.filteredFiches!= null) this.handler()
    }

    set metierChoice(str){
        this._metierChoice=str
        this.filteredFiches=this.ApplyFilter(this._notFilterFiches)
        // console.log(this.filteredFiches)
        if(filter.filteredFiches!= null) this.handler()

    }
    get filterChoice(){
        return this._filterChoice
    }

    get metierChoice(){
        return this._metierChoice;
    }

    set notFilterFiches(fiches){
        this._notFilterFiches=fiches
        this.filteredFiches=this.ApplyFilter(this._notFilterFiches)
    }

    get notFilterFiches(){
        return this._notFilterFiches
    }



    propComparator(parameter) {
        return function (a, b) {
            let firstValue =  a[parameter]
            let secondValue = b[parameter]
            if(parameter==="DCC"){
                firstValue = parseFloat(firstValue)
                secondValue  = parseFloat(secondValue)
            }
            
            if (firstValue < secondValue) {
                return -1;
            }
            if (firstValue > secondValue) {
                return 1;
            }
            return 0;
        }
    }
    
    
    SortFiler(fiches){
        if(this._filterChoice ==="" || fiches ==null) return fiches
        // console.log(this._filterChoice)
        fiches.sort(this.propComparator(this._filterChoice));

        if(this._filterChoice!="Contact"){
            fiches.reverse()}

        return fiches
    }
    
    FilterByMetier(fiches){

        if(this._metierChoice ==="" ) return null
        if(this._metierChoice ==="Global" ) return fiches
        return fiches.filter(fiche => {
            return fiche["Metier"]=== this._metierChoice})
    }
    
    ApplyFilter(fiches){

        fiches=this.FilterByMetier(fiches)

        fiches=this.SortFiler(fiches)
        return fiches
    }
}

window.filter = new Filter()
