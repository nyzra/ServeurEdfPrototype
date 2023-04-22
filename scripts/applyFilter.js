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
            if (a[parameter] < b[parameter]) {
                return -1;
            }
            if (a[parameter] > b[parameter]) {
                return 1;
            }
            return 0;
        }
    }
    
    
    SortFiler(fiches){
        if(this._filterChoice ==="" || fiches ==null) return fiches
        fiches.sort(this.propComparator(this._filterChoice));
        if(this._filterChoice!="Contact"){
            fiches.reverse()}
        return fiches
    }
    
    FilterByMetier(fiches){
        if(this._metierChoice ==="" ) return null
        return fiches.filter(fiche => {
            return fiche["Metier"][0]=== this._metierChoice})
    }
    
    ApplyFilter(fiches){
        fiches=this.FilterByMetier(fiches)
        fiches=this.SortFiler(fiches)
        return fiches
    }
}

window.filter = new Filter()
