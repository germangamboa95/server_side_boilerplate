const Controller = require('./Controller');
const db = require('../components/User/model');
class Page  extends Controller{

    constructor() {
        super();
        console.log(db)
    }


    show(req, res){
        console.log(req.session)
        res.render('pages/index');
    }

    async create(req, res) {
        const email = req.body.user_email; 
        const password = req.body.user_password;

        try {
            const res = await db.findOne({email: email}); 
            if(res !== null) throw error;
            
        } catch (error) {
            req.flash('error', 'Email already taken')
            res.redirect('/');
        }

        try {
            const user = new db(); 
            user.email = email; 
            user.password = user.generateHash(password);
            await user.save(); 
            req.flash('error', 'User created: ' + email)
        } catch (error) {
            req.flash('error', 'Create user failed')
        }
        res.redirect('/');
    }   

}





module.exports = new Page()