import {SyncScroll, ConfigOptions} from "md-sync-scroll";

const editArea = document.getElementById('code');
const previewArea = document.getElementById('markdown');
// 通过ConfigOptions可以配置参数，详细信息见下文`API`
const options = ConfigOptions.instance({
     syncWithClick: true,
     offsetScroll: 100
});
const syncScroll = new SyncScroll(options);

// 对于本页面来说，我用`h1-6`指示片段的开始，那么我就要查询被我指定为`h1-h6`的元素
// 在左边我用class='h1-6'标记，在右边用<h1>-<h6>表示
// syncScroll.addArea(editArea, '.h1,.h2,.h3,.h4,.h5,.h6');
// syncScroll.addArea(previewArea, 'h1,h2,h3,h4,h5,h6');
syncScroll.addAreas([
    {
        area: editArea,
        queryCriteria: '.h1,.h2,.h3,.h4,.h5,.h6'
    },
    {
        area: previewArea,
        queryCriteria: 'h1,h2,h3,h4,h5,h6'
    }
]);
// 可以调用`addArea`单个添加，在`addArea`调用后，需要手动调用`update`更新数据
// syncScroll.addArea({
//     area: editArea,
//     queryCriteria: '.h1,.h2,.h3,.h4,.h5,.h6'
// });
// syncScroll.addArea({
//     area: previewArea,
//     queryCriteria: 'h1,h2,h3,h4,h5,h6'
// });
// syncScroll.update();