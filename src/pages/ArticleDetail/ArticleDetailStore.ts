import {observable} from 'mobx';
import {request} from '../../utils/request';
import Loading from '../../components/widget/Loading';

export default class ArticleDetailStore {
  @observable detail: Article = {} as Article;

  requestArticleDetail = async (id: number) => {
    Loading.show();
    try {
      const params = {
        id,
      };
      const {data} = await request('articleDetail', params);
      this.detail = data || {};
    } catch (e) {
    } finally {
      Loading.hide();
    }
  };
}
