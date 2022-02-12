import GroupQuestion from '@/components/tests/GroupQuestion';
import { getPartToeic } from '@/commons/helpers/toeic';
import { useMemo } from 'react';

const TabTest = ({ data, handleChange, errors, type, handleDelete }) => {
  const partIds = useMemo(() => {
    return getPartToeic(data.category_id);
  }, [data.category_id]);

  const gennarateTab = useMemo(() => {
    return partIds.map((partId, index) => {
      const classActive = index === 0 ? 'active' : '';
      return (
        <li key={partId} className="nav-item" role="presentation">
          <a
            className={`${classActive} nav-link text-bold`}
            data-toggle="tab"
            id={`part${partId}-tab`}
            href={`#part${partId}`}
          >
            {`Part ${partId}`}
          </a>
        </li>
      )
    });
  }, [partIds]);

  const gennarateTabContent = useMemo(() => {
    return partIds.map((partId, index) => {
      const classActive = index === 0 ? 'active' : 'fade';
      return (
        <div
          key={partId}
          className={`tab-pane ${classActive}`}
          id={`part${partId}`}
        >
          <GroupQuestion
            data={data}
            errors={errors}
            partId={partId}
            disabled={type === 'detail'}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        </div>
      )
    });
  }, [partIds, data]);

  return (
    <div>
      <ul className="nav nav-tabs">
        {gennarateTab}
      </ul>

      <div className="tab-content">
        {gennarateTabContent}
      </div>
    </div>
  )
}

export default TabTest;
