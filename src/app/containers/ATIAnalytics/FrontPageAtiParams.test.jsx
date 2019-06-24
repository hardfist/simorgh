import React from 'react';
import renderer from 'react-test-renderer';
import * as atiUrl from './atiUrl';
import * as testUtils from '../../lib/analyticsUtils/frontpage';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

import FrontPageAtiParams from './FrontPageAtiParams';

describe('FrontPageAtiParams', () => {
  const mockFPData = {
    content: {},
    metadata: {
      analyticsLabels: {
        counterName: 'SERVICE.page',
        cps_asset_id: '12345678',
      },
      language: 'LANGUAGE',
      title: 'PAGE TITLE',
    },
  };

  const Component = (serviceContextStub, requestContextStub) => (
    <ServiceContext.Provider value={serviceContextStub}>
      <RequestContextProvider {...requestContextStub}>
        <FrontPageAtiParams {...mockFPData} />
      </RequestContextProvider>
    </ServiceContext.Provider>
  );
  const requestContextStub = {
    platform: 'canonical',
    statsDestination: 'WS_NEWS_LANGUAGES_TEST',
  };
  const serviceContextStub = {
    atiAnalyticsAppName: 'news-SERVICE',
    service: 'SERVICE',
  };

  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams with the params from the Contexts', () => {
      const mock = jest.fn().mockReturnValue('key=value&key2=value2');
      atiUrl.atiPageViewParams = mock;

      renderer.create(Component(serviceContextStub, requestContextStub));

      expect(atiUrl.atiPageViewParams).toHaveBeenCalledTimes(1);
      expect(atiUrl.atiPageViewParams).toHaveBeenCalledWith({
        appName: 'news-SERVICE',
        contentId: '12345678',
        contentType: 'index-home',
        language: 'LANGUAGE',
        pageIdentifier: 'SERVICE.page',
        pageTitle: 'PAGE TITLE',
        platform: 'canonical',
        service: 'SERVICE',
        statsDestination: 'WS_NEWS_LANGUAGES_TEST',
      });
    });

    it('should call front page utility functions with arguments', () => {
      testUtils.getContentId = jest.fn();
      testUtils.getLanguage = jest.fn();
      testUtils.getPageIdentifier = jest.fn();
      testUtils.getPageTitle = jest.fn();

      renderer.create(Component(serviceContextStub, requestContextStub));

      expect(testUtils.getContentId).toHaveBeenCalledTimes(1);
      expect(testUtils.getContentId).toHaveBeenCalledWith(mockFPData);

      expect(testUtils.getLanguage).toHaveBeenCalledTimes(1);
      expect(testUtils.getLanguage).toHaveBeenCalledWith(mockFPData);

      expect(testUtils.getPageIdentifier).toHaveBeenCalledTimes(1);
      expect(testUtils.getPageIdentifier).toHaveBeenCalledWith(mockFPData);

      expect(testUtils.getPageTitle).toHaveBeenCalledTimes(1);
      expect(testUtils.getPageTitle).toHaveBeenCalledWith(mockFPData);
    });
  });
});
