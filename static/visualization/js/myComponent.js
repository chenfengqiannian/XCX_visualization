//render component

var myComponentIns = {

    data: {
        item: {}
    },

    props: ['viewitem'],


    //render
    render: function (createElement) {

        //analyze string and insert the data to check the property change
        this.item = JSON.parse(this.viewitem);


        return createElement('p', this.viewitem)
    }
}