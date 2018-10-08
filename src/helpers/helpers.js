const _ = require('underscore');
module.exports = {
    editObject:(Object) => {
        return _.pick(Object, 'nombre','apellido','avatar','_id','email');
    },
}