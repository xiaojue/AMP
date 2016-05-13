/**
 * @author spring
 * @fileoverview 各个表之间的关联
 * @date 2016-05-09
 */

module.exports = {
    relyon: { //依赖关系
        urls: {
            tbname: 'collection',forkey: 'collection_id'
        },
        results: {
            tbname: 'urls',forkey: 'url_id'
        },
        arguments: {
            tbname: 'urls',forkey: 'url_id'
        }
    },
    children: {
        urls: [
            {tbname: 'arguments',forkey: 'url_id'},
            {tbname: 'results',forkey: 'url_id'}
        ]
    }
}