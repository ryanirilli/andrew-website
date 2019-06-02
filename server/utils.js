const orderBy = require("lodash.orderby");
module.exports = {
  vimeoOrder(items) {
    return orderBy(items.data, item => {
      const tag = item.tags.filter(i => i.tag && i.tag.includes("order"))[0];
      return tag && tag.tag;
    });
  }
};
