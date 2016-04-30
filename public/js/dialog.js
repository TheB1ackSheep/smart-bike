class Dialog {
    constructor(title, msg, btn_msg, btn_cancel) {
        this.title = title;
        this.msg = msg;
        this.id = this.makeId();
        if(!btn_msg)
            this.btn_msg = 'OK';
        else
            this.btn_msg = btn_msg;
        this.btn_cancel = btn_cancel;
        
        this.template = `<div class='overlay' id='dialog_`+this.id+`'>
            <div class='card'>
                <div class='header'>`+this.title+`</div>
                <div class='content'>
                    <p>`+this.msg+`</p>
                    <button class='btn btn-primary btn-confirm'>`+this.btn_msg+`</button>`;
        if( this.btn_cancel )
            this.template += `<button class='btn btn-default btn-cancel'>Cancel</button>`;
        this.template += `</div>
                </div>
            </div>`;
    }
    
    getDialog(){
        return document.querySelector('#dialog_'+this.id);
    }
    
    show(){
        var that = this;
        if(this.getDialog() == null){
            document.querySelector('body').innerHTML += this.template;
            if(this.btn_cancel)
                this.getDialog().querySelector('.btn-cancel').addEventListener('click', (ev) => {
                    var dialog = that.getDialog();
                    dialog.remove();
                    if(typeof that.onCancel == 'function')
                        that.onCancel.call(that);
                });
             this.getDialog().querySelector('.btn-confirm').addEventListener('click', (ev) => {
                if(typeof that.onConfirm == 'function')
                    that.onConfirm.call(that);
            });
        }
    }
    
    hide(){
        var dialog = this.getDialog();
        dialog.remove();
    }
    
    
    /* by csharptest.net */
    makeId()
    {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}
